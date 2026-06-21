import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
import java.io.*;

public class ImageWindow extends JFrame {
    private JLabel imageLabel;   // ͼƬ��ǩ
    private JButton prevButton; // ��һҳ��ť
    private JButton nextButton; // ��һҳ��ť
    private int currentPage = 1; // ��ǰҳ��
    private File[] imageFiles;   // ͼƬ�ļ�����
	
	public ImageWindow(){
		//�޲ι���
	}
    public ImageWindow(String folderPath) {
        super("ͼƬ�����");

        // ��ȡָ���ļ����µ�ͼƬ�ļ�
        File folder = new File(folderPath);
        if (!folder.isDirectory()) {
            System.err.println("ָ��·�������ļ��У�");
            System.exit(1);
        }
        imageFiles = folder.listFiles(new FilenameFilter() {
            public boolean accept(File dir, String name) {
                return name.toLowerCase().endsWith(".jpg") || name.toLowerCase().endsWith(".png");
            }
        });

        // ����ļ�����û��ͼƬ�ļ������˳�����
        if (imageFiles == null || imageFiles.length == 0) {
            System.err.println("ָ���ļ�����û��ͼƬ�ļ���");
            System.exit(1);
        }

        // �����������ĵ�ͼƬ��ǩ
        imageLabel = new JLabel(new ImageIcon(imageFiles[0].getPath()));
        imageLabel.setHorizontalAlignment(JLabel.CENTER);
		imageLabel.setPreferredSize(null);

        // ������һҳ����һҳ��ť
        prevButton = new JButton("��һҳ");
        nextButton = new JButton("��һҳ");

        // ������һҳ����һҳ��ť���¼�������
        prevButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                currentPage--;
                if (currentPage < 1) {
                    currentPage = imageFiles.length;
                }
                imageLabel.setIcon(new ImageIcon(imageFiles[currentPage - 1].getPath()));
            }
        });

        nextButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                currentPage++;
                if (currentPage > imageFiles.length) {
                    currentPage = 1;
                }
                imageLabel.setIcon(new ImageIcon(imageFiles[currentPage - 1].getPath()));
            }
        });

        // ��������������壬�����ò���
        JPanel contentPane = new JPanel(new BorderLayout());
        contentPane.add(imageLabel, BorderLayout.CENTER);
        JPanel buttonPanel = new JPanel(new GridLayout(1, 2));
        buttonPanel.add(prevButton);
        buttonPanel.add(nextButton);
        contentPane.add(buttonPanel, BorderLayout.SOUTH);

        // �����������ӵ�������
        setContentPane(contentPane);

        // ���ô��ڴ�С��ʹ������ӦͼƬ��С
        setSize(imageLabel.getPreferredSize().width, imageLabel.getPreferredSize().height + 50);

        // ��ʾ����
        setVisible(true);
    }

    public static void main(String[] args) {
        // �������ڲ���ʾ
        if (args.length < 1) {
            System.err.println("��ָ��һ��ͼƬ�ļ��е�·����");
            System.exit(1);
        }
        ImageWindow window = new ImageWindow(args[0]);
		window = new ImageWindow("E:\\BaiduSyncdisk\\project\\_ɬ_ͼ");
        window.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }
}
